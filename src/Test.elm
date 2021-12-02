module Test exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import MiniLatex
--import MiniLatex.Render exposing(MathJaxRenderOption(..))


-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }

texteLaTeX = "Pythagoras says: $a^2 + b^2 = c^2$"



-- MODEL


type alias Model = Int


init : Model
init =
  0



-- UPDATE


type Msg
  = Increment
  | Decrement


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1



-- VIEW


view : Model -> Html Msg
view model =
  MiniLatex.render "" NoDelay texteLaTeX
