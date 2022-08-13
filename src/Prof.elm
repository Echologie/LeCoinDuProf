module Prof exposing (main)

import Browser
import Browser.Navigation as Nav
import CalculateurDeNotes
import Echologo exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import GenerateurDeProblemes
import GenerateurH5P
import Html exposing (Html)
import Html.Attributes
import Style exposing (..)
import Url



{-
   ███    ███  █████  ██ ███    ██
   ████  ████ ██   ██ ██ ████   ██
   ██ ████ ██ ███████ ██ ██ ██  ██
   ██  ██  ██ ██   ██ ██ ██  ██ ██
   ██      ██ ██   ██ ██ ██   ████
-}


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



{-
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████
-}


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , page : Page
    , largeur : Int
    , hauteur : Int
    , modeleGenerateurDeProblemes : GenerateurDeProblemes.Model
    , modeleCalculateurDeNotes : CalculateurDeNotes.Model
    , modeleGenerateurH5P : GenerateurH5P.Model
    }


type Page
    = GenerateurDeProblemes
    | CalculateurDeNotes
    | GenerateurH5P


type alias Flags =
    { l : Int
    , h : Int
    }


init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    case url.fragment of
        Just "CalculateurDeNotes" ->
            ( Model key
                url
                CalculateurDeNotes
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
                GenerateurH5P.init
            , Cmd.none
            )

        Just "GenerateurDeProblemes" ->
            ( Model key
                url
                GenerateurDeProblemes
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
                GenerateurH5P.init
            , Cmd.none
            )

        Just "GenerateurH5P" ->
            ( Model key
                url
                GenerateurH5P
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
                GenerateurH5P.init
            , Cmd.none
            )

        _ ->
            ( Model key
                { url | fragment = Just "GenerateurH5P" }
                GenerateurH5P
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
                GenerateurH5P.init
            , Nav.pushUrl key (Url.toString { url | fragment = Just "GenerateurH5P" })
            )



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | CalculateurDeNotesMsg CalculateurDeNotes.Msg
    | GenerateurDeProblemesMsg GenerateurDeProblemes.Msg
    | GenerateurH5PMsg GenerateurH5P.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.page ) of
        ( LinkClicked urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        ( UrlChanged url, _ ) ->
            case url.fragment of
                Just "CalculateurDeNotes" ->
                    ( { model
                        | url = url
                        , page = CalculateurDeNotes
                      }
                    , Cmd.none
                    )

                Just "GenerateurDeProblemes" ->
                    ( { model
                        | url = url
                        , page = GenerateurDeProblemes
                      }
                    , Cmd.none
                    )

                Just "GenerateurH5P" ->
                    ( { model
                        | url = url
                        , page = GenerateurH5P
                      }
                    , Cmd.none
                    )

                _ ->
                    ( { model
                        | url = { url | fragment = Just "GenerateurH5P" }
                        , page = GenerateurH5P
                      }
                    , Nav.pushUrl model.key (Url.toString { url | fragment = Just "GenerateurH5P" })
                    )

        ( GenerateurDeProblemesMsg message, GenerateurDeProblemes ) ->
            let
                ( nouveauModele, commande ) =
                    GenerateurDeProblemes.update message
                        model.modeleGenerateurDeProblemes
            in
            ( { model
                | modeleGenerateurDeProblemes = nouveauModele
              }
            , Cmd.map GenerateurDeProblemesMsg commande
            )

        ( CalculateurDeNotesMsg message, CalculateurDeNotes ) ->
            let
                ( nouveauModele, commande ) =
                    CalculateurDeNotes.update message model.modeleCalculateurDeNotes
            in
            ( { model
                | modeleCalculateurDeNotes = nouveauModele
              }
            , Cmd.map CalculateurDeNotesMsg commande
            )

        ( GenerateurH5PMsg message, GenerateurH5P ) ->
            let
                ( nouveauModele, commande ) =
                    GenerateurH5P.update message
                        model.modeleGenerateurH5P
            in
            ( { model
                | modeleGenerateurH5P = nouveauModele
              }
            , Cmd.map GenerateurH5PMsg commande
            )

        _ ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



{-

   ██    ██ ██ ███████ ██     ██
   ██    ██ ██ ██      ██     ██
   ██    ██ ██ █████   ██  █  ██
    ██  ██  ██ ██      ██ ███ ██
     ████   ██ ███████  ███ ███
-}


view : Model -> Browser.Document Msg
view model =
    case model.page of
        CalculateurDeNotes ->
            { title = CalculateurDeNotes.titre
            , body =
                [ CalculateurDeNotes.view model.modeleCalculateurDeNotes
                    |> Element.map CalculateurDeNotesMsg
                    |> designGeneral
                        model.largeur
                        CalculateurDeNotes.titre
                ]
            }

        GenerateurDeProblemes ->
            { title = GenerateurDeProblemes.titre
            , body =
                [ GenerateurDeProblemes.view model.modeleGenerateurDeProblemes
                    |> Element.map GenerateurDeProblemesMsg
                    |> designGeneral
                        model.largeur
                        GenerateurDeProblemes.titre
                ]
            }

        GenerateurH5P ->
            { title = GenerateurH5P.titre
            , body =
                [ GenerateurH5P.view model.modeleGenerateurH5P
                    |> Element.map GenerateurH5PMsg
                    |> designGeneral
                        model.largeur
                        GenerateurH5P.titre
                ]
            }


viewLink : String -> Html msg
viewLink path =
    Html.li [] [ Html.a [ Html.Attributes.href path ] [ Html.text path ] ]
