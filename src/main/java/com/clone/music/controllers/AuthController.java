package com.clone.music.controllers;


import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.enums.ModelObjectType;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.*;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.artists.GetArtistRequest;
import se.michaelthelin.spotify.requests.data.artists.GetArtistsRelatedArtistsRequest;
import se.michaelthelin.spotify.requests.data.artists.GetArtistsTopTracksRequest;
import se.michaelthelin.spotify.requests.data.browse.GetListOfNewReleasesRequest;
import se.michaelthelin.spotify.requests.data.follow.GetUsersFollowedArtistsRequest;

import com.neovisionaries.i18n.CountryCode;
import se.michaelthelin.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;


@RestController
@RequestMapping("/api")
@Component
public class AuthController {

    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/api/get-user-code/");

    private String code = "";

    Dotenv dotenv = Dotenv.load();

    private final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId("0151b1e9d68044cdaf7fa92b71dc9051")
            .setClientSecret(dotenv.get("CLIENT_SECRET"))
            .setRedirectUri(redirectUri)
            .build();


    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("user-read-private, user-read-email, user-top-read, user-library-read, user-follow-read")
                .show_dialog(true)
                .build();
        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }



    @GetMapping(value = "get-user-code")
    public void getSpotifyUserCode( @RequestParam("code") String userCode, HttpServletResponse response) throws IOException {
        code = userCode;
//        System.out.println(CLIENT_ID);
//        System.out.println(CLIENT_SECRET);
//        System.out.println(code);
        final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();

        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
//            System.out.println(CLIENT_ID);
//            System.out.println(CLIENT_SECRET);

//            Set access and refresh token for further "spotifyApi" object usage
            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
        } catch (IOException | SpotifyWebApiException |org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        response.sendRedirect("http://localhost:8080/followed-artists");
//        return spotifyApi( CLIENT_ID, CLIENT_SECRET ).getAccessToken();

    }

    @GetMapping(value = "/user-followed-artists")
    public Artist[] getUserTopArtists() {

        final ModelObjectType type = ModelObjectType.ARTIST;

        final GetUsersFollowedArtistsRequest getUsersFollowedArtistsRequest = spotifyApi.getUsersFollowedArtists(type)
                .build();


        try {



            final PagingCursorbased<Artist> artistPagingCursorbased = getUsersFollowedArtistsRequest.execute();
            System.out.println(artistPagingCursorbased);
            return artistPagingCursorbased.getItems();

        } catch (Exception e) {
            System.out.println("Something went wrong!\n" + e.getMessage());
        }
        return new Artist[0];
    }

    @GetMapping(value = "/artist/{id}")
    public Artist getArtist(@PathVariable String id) {



        final GetArtistRequest getArtistRequest = spotifyApi.getArtist(id)
                .build();

        try {

            final Artist artist = getArtistRequest.execute();

             return artist;
        } catch (Exception e) {
            System.out.println("Something went wrong!\n" + e.getMessage());
        }

        return null;
    }

    @GetMapping(value = "/artist-tracks/{id}")
    public Track[] getArtistBestTracks (@PathVariable String id) {
        CountryCode country = CountryCode.DE;

        final GetArtistsTopTracksRequest getArtistsTopTracksRequest = spotifyApi
                .getArtistsTopTracks(id, country)
                .build();

        try {
            final Track[] tracks = getArtistsTopTracksRequest.execute();
            return tracks;
        } catch (Exception e) {
            System.out.println("Something went wrong!\n" + e.getMessage());
        }

        return null;
    }

    @GetMapping(value = "/artist-related/{id}")
    public Artist[] getRelatedArtists(@PathVariable String id) {

        final GetArtistsRelatedArtistsRequest getArtistsRelatedArtistsRequest = spotifyApi
                .getArtistsRelatedArtists(id)
                .build();

        try {

            final Artist[] artists = getArtistsRelatedArtistsRequest.execute();

            return artists;

        } catch (Exception e) {
            System.out.println("Something went wrong!\n" + e.getMessage());
        }
        return null;
    }

    @GetMapping(value = "/user")
    public User getCurrentUserProfile() {
        final GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi
                .getCurrentUsersProfile()
                .build();
        try {
            final User user = getCurrentUsersProfileRequest.execute();
            return user;
        } catch (Exception e) {
            System.out.println("Something went wrong!\n" + e.getMessage());
        }
        return null;
    }

    @GetMapping(value = "/new")
    public Paging<AlbumSimplified> getListOfNewReleases() {
        CountryCode country = CountryCode.DE;
        final GetListOfNewReleasesRequest getListOfNewReleasesRequest = spotifyApi.getListOfNewReleases()
                .country(country)
                .build();
        try {
            final Paging<AlbumSimplified> albumSimplifiedPaging = getListOfNewReleasesRequest.execute();
            return albumSimplifiedPaging;
        } catch (Exception e) {
            System.out.println("Something went wrong!\n" + e.getMessage());
        }
        return null;
    }
}
