module Test exposing (..)

import Browser
import Element exposing (..)
import Element.Input as Input
import Html exposing (Html)



-- MAIN


main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
    { texte : String }


init =
    { texte = "" }



-- UPDATE


type Msg
    = NouveauTexte String


update : Msg -> Model -> Model
update (NouveauTexte texte) model =
    { texte = texte }



-- VIEW


view : Model -> Html Msg
view model =
    layout [ width fill, height fill ] <|
        row []
            [ Input.multiline [ height <| maximum 300 fill, clip, scrollbars ]
                { onChange = NouveauTexte
                , label = Input.labelAbove [] <| text "Test"
                , placeholder =
                    Just <|
                        Input.placeholder [] <|
                            text "Entrer le texte"
                , text = String.toUpper model.texte
                , spellcheck = False
                }
            , text model.texte
            ]
