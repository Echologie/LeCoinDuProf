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
    }


type Page
    = GenerateurDeProblemes
    | CalculateurDeNotes


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
            , Cmd.none
            )

        _ ->
            ( Model key
                { url | fragment = Just "GenerateurDeProblemes" }
                GenerateurDeProblemes
                flags.l
                flags.h
                GenerateurDeProblemes.init
                CalculateurDeNotes.init
            , Nav.pushUrl key (Url.toString { url | fragment = Just "GenerateurDeProblemes" })
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

                _ ->
                    ( { model
                        | url = { url | fragment = Just "GenerateurDeProblemes" }
                        , page = GenerateurDeProblemes
                      }
                    , Nav.pushUrl model.key (Url.toString { url | fragment = Just "GenerateurDeProblemes" })
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
                        (model.largeur - 2 * (petitEspacement + grandEspacement))
                        CalculateurDeNotes.titre
                ]
            }

        GenerateurDeProblemes ->
            { title = GenerateurDeProblemes.titre
            , body =
                [ GenerateurDeProblemes.view model.modeleGenerateurDeProblemes
                    |> Element.map GenerateurDeProblemesMsg
                    |> designGeneral
                        (10 * (model.largeur - 2 * (petitEspacement + grandEspacement)) // 44)
                        GenerateurDeProblemes.titre
                ]
            }


designGeneral largeur titre elmt =
    layout
        [ height fill
        , width fill
        , padding tresGrandEspacement
        , Background.color <| vert 0.2
        ]
    <|
        column
            [ height fill
            , width fill
            , Background.color <| vert 0
            , Border.rounded 13
            ]
            [ row []
                [ entete 135 largeur titre

                {-
                   , el
                       [ Font.size 120
                       , Font.color <| vert 0.2
                       , Font.shadow
                           { offset = ( 2, 2 )
                           , blur = 3
                           , color = vert 1
                           }
                       ]
                     <|
                       text titre
                -}
                ]
            , elmt
            ]


viewLink : String -> Html msg
viewLink path =
    Html.li [] [ Html.a [ Html.Attributes.href path ] [ Html.text path ] ]
