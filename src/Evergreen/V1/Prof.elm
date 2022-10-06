module Evergreen.V1.Prof exposing (..)

import Browser
import Browser.Navigation
import Evergreen.V1.CalculateurDeNotes
import Evergreen.V1.GenerateurDeProblemes
import Evergreen.V1.GenerateurH5P
import Evergreen.V1.GenerateurJson
import Url


type Page
    = GenerateurDeProblemes
    | CalculateurDeNotes
    | GenerateurH5P
    | GenerateurJson


type alias Model =
    { key : Browser.Navigation.Key
    , url : Url.Url
    , page : Page
    , largeur : Int
    , hauteur : Int
    , modeleGenerateurDeProblemes : Evergreen.V1.GenerateurDeProblemes.Model
    , modeleCalculateurDeNotes : Evergreen.V1.CalculateurDeNotes.Model
    , modeleGenerateurH5P : Evergreen.V1.GenerateurH5P.Model
    , modeleGenerateurJson : Evergreen.V1.GenerateurJson.Model
    }


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | CalculateurDeNotesMsg Evergreen.V1.CalculateurDeNotes.Msg
    | GenerateurDeProblemesMsg Evergreen.V1.GenerateurDeProblemes.Msg
    | GenerateurH5PMsg Evergreen.V1.GenerateurH5P.Msg
    | GenerateurJsonMsg Evergreen.V1.GenerateurJson.Msg
