package com.clone.music.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
@Controller
public class HomePageController {



    public HomePageController() {
        super();
    }

    @GetMapping("/")
    public String HomePage(Model model) {
       return "HomePage";
    }

    @GetMapping("/login")
    public String LoginPage(Model model) {
        return "LogIn";
    }

    @GetMapping("/followed-artists")
    public String TopArtists(Model model) {
        return "FollowedArtists";
    }

    @GetMapping("/artist/{id}")
    public String Artist(@PathVariable String id, Model model) {
        return "artist";
    }

    @GetMapping("/user")
    public String User(Model model) {
        return "user";
    }
}
