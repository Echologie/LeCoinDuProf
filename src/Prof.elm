module Prof exposing (..)

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
import GenerateurJson
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
    , modeleGenerateurJson : GenerateurJson.Model
    }


type Page
    = GenerateurDeProblemes
    | CalculateurDeNotes
    | GenerateurH5P
    | GenerateurJson


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
                GenerateurJson.init
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
                GenerateurJson.init
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
                GenerateurJson.init
            , Cmd.none
            )

        Just "GenerateurJson" ->
            ( Model key
                url
                GenerateurJson
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
                GenerateurH5P.init
                GenerateurJson.init
            , Cmd.none
            )

        _ ->
            ( Model key
                { url | fragment = Just "GenerateurJson" }
                GenerateurJson
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
                GenerateurH5P.init
                GenerateurJson.init
            , Nav.pushUrl key (Url.toString { url | fragment = Just "GenerateurJson" })
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
    | GenerateurJsonMsg GenerateurJson.Msg


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

                Just "GenerateurJson" ->
                    ( { model
                        | url = url
                        , page = GenerateurJson
                      }
                    , Cmd.none
                    )

                _ ->
                    ( { model
                        | url = { url | fragment = Just "GenerateurJson" }
                        , page = GenerateurJson
                      }
                    , Nav.pushUrl model.key (Url.toString { url | fragment = Just "GenerateurJson" })
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

        ( GenerateurJsonMsg message, GenerateurJson ) ->
            let
                ( nouveauModele, commande ) =
                    GenerateurJson.update message
                        model.modeleGenerateurJson
            in
            ( { model
                | modeleGenerateurJson = nouveauModele
              }
            , Cmd.map GenerateurJsonMsg commande
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

        GenerateurJson ->
            { title = GenerateurJson.titre
            , body =
                [ GenerateurJson.view model.modeleGenerateurJson
                    |> Element.map GenerateurJsonMsg
                    |> designGeneral
                        model.largeur
                        GenerateurJson.titre
                ]
            }


viewLink : String -> Html msg
viewLink path =
    Html.li [] [ Html.a [ Html.Attributes.href path ] [ Html.text path ] ]
