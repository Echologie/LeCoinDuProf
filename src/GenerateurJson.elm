module GenerateurJson exposing (..)

import Browser exposing (Document)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import ElmCodeGenerator
import File.Download
import Html exposing (Attribute, Html, button, div, iframe, input, p, section, textarea)
import Json.Decode
import Json.Encode
import List as L
import Set
import String as S
import Style exposing (..)


titre =
    "Générateur Json"



{-
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████
-}


type alias Model =
    { nomObjet : String
    , sourceJson : String
    , codeElmGenere : String
    }


init : Model
init =
    { nomObjet = ""
    , sourceJson = ""
    , codeElmGenere = ""
    }



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = NomObjet String
    | SourceJson String
    | GenererCodeElm
    | TelechargerCodeElm


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NomObjet nom ->
            let
                modelHelp =
                    { model | nomObjet = nom }
            in
            ( { modelHelp
                | codeElmGenere = generateur modelHelp.nomObjet modelHelp.sourceJson
              }
            , Cmd.none
            )

        SourceJson source ->
            let
                modelHelp =
                    { model | sourceJson = source }
            in
            ( { modelHelp
                | codeElmGenere = generateur modelHelp.nomObjet modelHelp.sourceJson
              }
            , Cmd.none
            )

        GenererCodeElm ->
            ( { model | codeElmGenere = generateur model.nomObjet model.sourceJson }
            , Cmd.none
            )

        TelechargerCodeElm ->
            ( model
            , File.Download.string (model.nomObjet ++ ".elm") "text/elm" model.codeElmGenere
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



{-

   ██    ██ ██ ███████ ██     ██
   ██    ██ ██ ██      ██     ██
   ██    ██ ██ █████   ██  █  ██
    ██  ██  ██ ██      ██ ███ ██
     ████   ██ ███████  ███ ███
-}


view : Model -> Element Msg
view model =
    row
        [ spacing grandEspacement
        , padding tresGrandEspacement
        , height fill
        , width fill
        , scrollbars
        ]
        [ column [ spacing petitEspacement, height fill, width fill, scrollbars ]
            [ Input.multiline
                [ height fill
                , width fill
                , clip
                , scrollbars
                , Background.color <| couleurUI <| couleurArrierePlan
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
                { onChange = NomObjet
                , label = Input.labelHidden "truc"
                , placeholder =
                    Just <|
                        Input.placeholder [] <|
                            text "NomDeLobjet"
                , text = model.nomObjet
                , spellcheck = False
                }
            , Input.multiline
                [ height fill
                , width fill
                , clip
                , scrollbars
                , Background.color <| couleurUI <| couleurArrierePlan
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
                { onChange = SourceJson
                , label = Input.labelHidden "chose"
                , placeholder =
                    Just <|
                        Input.placeholder [] <|
                            text "Code source Json à intégrer dans un projet Elm"
                , text = model.sourceJson
                , spellcheck = False
                }
            ]
        , column [ spacing petitEspacement, height fill, width fill, scrollbars ]
            -- L'attibut scrollbars présent dans la liste ci-dessus  ^^^^^^^^^^
            -- est nécessaire pour que l'élément ci-dessous ne s'étende pas !
            [ row
                [ width fill
                , padding petitEspacement
                , spacing tresGrandEspacement
                ]
                [ bouton TelechargerCodeElm "Télécharger"
                ]
            , el
                --^^ Cet élément ci
                [ height fill
                , width fill
                , clip
                , scrollbars

                --^^^^^^^^^^ Cet attribut ne suffit pas
                , padding petitEspacement
                , Background.color <| couleurUI <| couleurArrierePlan
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
              <|
                text model.codeElmGenere
            ]
        ]



{-
    ██████  ███████ ███    ██ ███████ ██████   █████  ████████ ███████ ██    ██ ██████
   ██       ██      ████   ██ ██      ██   ██ ██   ██    ██    ██      ██    ██ ██   ██
   ██   ███ █████   ██ ██  ██ █████   ██████  ███████    ██    █████   ██    ██ ██████
   ██    ██ ██      ██  ██ ██ ██      ██   ██ ██   ██    ██    ██      ██    ██ ██   ██
    ██████  ███████ ██   ████ ███████ ██   ██ ██   ██    ██    ███████  ██████  ██   ██
-}


generateur nomObjet sourceJson =
    case parser nomObjet sourceJson of
        Ok code ->
            S.join "\n" <|
                code.imports
                    ++ code.types
                    ++ code.decoders
                    ++ code.encoders

        Err erreurs ->
            erreurs


parser nomObjet sourceJson =
    ElmCodeGenerator.fromJsonSample
        { rootTypeName = nomObjet
        , decodeImport =
            { importAlias = "Json.Decode"
            , exposingSpec = ElmCodeGenerator.ExposingNone
            }
        , encodeImport =
            { importAlias = "Json.Encode"
            , exposingSpec = ElmCodeGenerator.ExposingNone
            }
        , decoderStyle = ElmCodeGenerator.PlainDecoders
        , namingStyle = ElmCodeGenerator.NounNaming
        }
        sourceJson
