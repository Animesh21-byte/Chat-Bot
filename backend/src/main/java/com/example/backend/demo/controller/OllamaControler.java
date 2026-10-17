package com.example.backend.demo.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@CrossOrigin("*")
@RequestMapping("/api/ollama")
public class OllamaControler {
    private ChatClient chatClient;

    public OllamaControler(OllamaChatModel chatModel){
        this.chatClient = ChatClient.create(chatModel);
    }

    @GetMapping("/{prompt}")
    public ResponseEntity<String> getAnswer(@PathVariable String prompt){
        String responce = chatClient
                            .prompt(prompt)
                            .call()
                            .content();
        return new ResponseEntity<>(responce,HttpStatus.OK);
    }
}
