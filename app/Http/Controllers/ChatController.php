<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Services\N8nChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function history(Request $request)
    {
        $user = $request->user();
        $sessionId = (string) $request->query('session_id', '');

        if ($sessionId === '') {
            $sessionId = ChatMessage::where('user_id', $user->id)
                ->latest('created_at')
                ->value('session_id') ?? '';
        }

        $messages = collect();

        if ($sessionId !== '') {
            $messages = ChatMessage::where('user_id', $user->id)
                ->where('session_id', $sessionId)
                ->orderBy('created_at')
                ->limit(200)
                ->get(['id', 'role', 'content', 'created_at']);
        }

        return response()->json([
            'session_id' => $sessionId,
            'messages' => $messages->map(fn ($message) => [
                'id' => $message->id,
                'sender' => $message->role,
                'text' => $message->content,
                'timestamp' => $message->created_at->format('H:i'),
            ]),
        ]);
    }

    public function send(Request $request, N8nChatService $chatService)
    {
        $data = $request->validate([
            'message' => ['required', 'string', 'max:4000'],
            'session_id' => ['nullable', 'string', 'max:64'],
        ]);

        $user = $request->user();
        $sessionId = $data['session_id'] ?: Str::uuid()->toString();

        ChatMessage::create([
            'user_id' => $user->id,
            'session_id' => $sessionId,
            'role' => 'user',
            'content' => $data['message'],
            'meta' => ['source' => 'web'],
        ]);

        $reply = null;
        $error = null;

        try {
            $payload = [
                'action' => 'chat_message',
                'source' => 'web',
                'session_id' => $sessionId,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'message' => $data['message'],
            ];

            $response = $chatService->sendMessage($payload);
            $reply = $chatService->extractReply($response) ?? 'Merci ! Je reviens vers vous avec les meilleures options.';
        } catch (\Throwable $exception) {
            report($exception);
            $error = 'Erreur de connexion à Lila.';
            $reply = "Désolé, je n'arrive pas à répondre pour le moment. Réessayez dans un instant.";
        }

        ChatMessage::create([
            'user_id' => $user->id,
            'session_id' => $sessionId,
            'role' => 'assistant',
            'content' => $reply,
            'meta' => ['source' => 'web', 'error' => $error],
        ]);

        return response()->json([
            'session_id' => $sessionId,
            'message' => $reply,
            'error' => $error,
        ], $error ? 503 : 200);
    }
}
