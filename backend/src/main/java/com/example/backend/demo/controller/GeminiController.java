package com.example.backend.demo.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/gemini")
public class GeminiController {
    private final ChatClient chatClient;

    public GeminiController(GoogleGenAiChatModel chatModel) {
        this.chatClient = ChatClient.create(chatModel);
    }

    @GetMapping("/{prompt}")
    public ResponseEntity<String> getAnswer(@PathVariable String prompt) {
        String response = chatClient
                .prompt(prompt)
                .call()
                .content();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
