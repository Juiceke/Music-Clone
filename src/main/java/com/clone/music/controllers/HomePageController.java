package com.clone.music.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

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
}
