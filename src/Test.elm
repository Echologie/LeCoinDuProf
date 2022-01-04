module Test exposing (..)

import Browser
import Debug exposing (todo)
import Element exposing (..)
import Element.Input as Input
import Html exposing (Html)
import Svg exposing (circle, g, path, svg)
import Svg.Attributes as SvgA exposing (color, cx, cy, r, strokeWidth, viewBox, x, y)



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
        column [ padding 100, centerX, centerY ]
            [ html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleRouge
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleVert
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleVertBis
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleBleu
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleBleuBis
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleCyan
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleGris
                    ]
            , html <|
                svg [ SvgA.height "100", SvgA.width "512" ]
                    [ rectangleGrisBis
                    ]
            , html <|
                svg [ SvgA.height "768", SvgA.width "768" ]
                    [ carreBleu
                    ]
            ]


trait n r v b =
    Svg.rect
        [ x (String.fromFloat n)
        , SvgA.fill <| "rgb(" ++ String.fromFloat r ++ "," ++ String.fromFloat v ++ "," ++ String.fromFloat b ++ ")"
        , SvgA.color <| "rgb(" ++ String.fromFloat r ++ "," ++ String.fromFloat v ++ "," ++ String.fromFloat b ++ ")"
        , SvgA.width "1"
        , SvgA.height "100"
        , y "0"
        ]
        []


point xCoord yCoord r v b =
    Svg.rect
        [ x (String.fromFloat xCoord)
        , SvgA.fill <| "rgb(" ++ String.fromFloat r ++ "," ++ String.fromFloat v ++ "," ++ String.fromFloat b ++ ")"
        , SvgA.color <| "rgb(" ++ String.fromFloat r ++ "," ++ String.fromFloat v ++ "," ++ String.fromFloat b ++ ")"
        , SvgA.width "2"
        , SvgA.height "2"
        , y (String.fromFloat yCoord)
        ]
        []


rectangleRouge =
    g [] <|
        List.map (\x -> trait x (x * 0.9) 0 0) range
            ++ List.map (\x -> trait (x + 256) (255 * 0.9) (x * 0.9) (x * 0.9)) range


rectangleVertBis =
    g [] <|
        List.map (\x -> trait x 0 x 0) range
            ++ List.map (\x -> trait (x + 256) x 255 x) range


rectangleVert =
    g [] <|
        List.map (\x -> trait x 0 (x * 0.8) 0) range
            ++ List.map (\x -> trait (x + 256) (x * 0.8) (255 * 0.8) (x * 0.8)) range


rectangleBleu =
    g [] <|
        List.map (\x -> trait x 0 0 x) range
            ++ List.map (\x -> trait (x + 256) (x * 0.9) x 255) range


carreBleu =
    g [] <| List.map (\( x, y ) -> point (3 * x) (3 * y) x y 255) carre


rectangleBleuBis =
    let
        f x =
            128 + 30 * (logBase e (4 + x) - logBase e (260 - x))
    in
    g [] <|
        List.map (\x -> trait x 0 0 (f x)) range
            ++ List.map (\x -> trait (x + 256) (f x) (f x) 255) range


rectangleGris =
    g [] <|
        List.map (\x -> trait x (x / 2) (x / 2) (x / 2)) range
            ++ List.map (\x -> trait (x + 256) (128 + x / 2) (128 + x / 2) (128 + x / 2)) range


rectangleGrisBis =
    let
        f x =
            128 + 30 * (logBase e (4 + x) - logBase e (260 - x))
    in
    g [] <|
        List.map (\x -> trait (2 * x) (f x) (f x) (f x)) range
            ++ List.map (\x -> trait (2 * x + 1) (f x) (f x) (f x)) range


rectangleCyan =
    g [] <|
        List.map (\x -> trait x 0 (x * 0.3) x) range
            ++ List.map (\x -> trait (x + 256) x (x + 0.3 * (255 - x)) 255) range


range =
    List.map ((\x -> x / 10) << toFloat) <| List.range 0 2550


carre =
    let
        f n =
            List.map (Tuple.pair n << toFloat) <| List.range 0 255
    in
    List.concatMap (f << toFloat) <| List.range 0 255


type alias Couleur =
    { rouge : Float
    , vert : Float
    , bleu : Float
    }


type alias CouleurRvb =
    { rouge : Float
    , vert : Float
    , bleu : Float
    }


versRvb : Couleur -> CouleurRvb
versRvb { rouge, vert, bleu } =
    if rouge < vert && vert < bleu then
        todo "bla"

    else
        todo "bla"


plusSombre : Float -> Couleur -> Couleur
plusSombre taux { rouge, vert, bleu } =
    if rouge < vert && rouge < bleu then
        let
            nouveauRouge =
                rouge * taux

            nouveauPasRouge =
                nouveauRouge - rouge
        in
        { rouge = nouveauRouge
        , vert = vert + nouveauPasRouge
        , bleu = bleu + nouveauPasRouge
        }

    else if vert < bleu then
        let
            nouveauVert =
                vert * taux

            nouveauPasVert =
                nouveauVert - vert
        in
        { rouge = rouge + nouveauPasVert
        , vert = nouveauVert
        , bleu = bleu + nouveauPasVert
        }

    else
        let
            nouveauBleu =
                bleu * taux

            nouveauPasBleu =
                nouveauBleu - bleu
        in
        { rouge = rouge + nouveauPasBleu
        , vert = vert + nouveauPasBleu
        , bleu = bleu + nouveauBleu
        }
