module Style exposing (..)

import Color
import Color.Convert
import Color.Manipulate
import Echologo exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Input as Input
import Svg exposing (..)
import Svg.Attributes as SvgA
    exposing
        ( color
        , dx
        , dy
        , floodColor
        , floodOpacity
        , fontFamily
        , fontSize
        , id
        , in2
        , in_
        , operator
        , r
        , stdDeviation
        , strokeWidth
        , viewBox
        , x
        , y
        )


couleurUI =
    fromRgb << Color.toRgba


vert t =
    Color.Manipulate.lighten t vertMante


couleurArrierePlan =
    vert 0.3


petitEspacement =
    20


grandEspacement =
    5 * petitEspacement // 4


tresGrandEspacement =
    25 * petitEspacement // 16


bouton fonction label =
    Input.button
        [ centerY
        , padding petitEspacement
        , Background.color <| couleurUI <| vert -0.2
        , Border.rounded 8
        , Border.shadow
            { blur = 10
            , color = rgb255 10 10 10
            , offset = ( 0.3, 0.4 )
            , size = 2
            }
        ]
        { onPress = Just fonction
        , label = Element.text label
        }


entete largeur titre =
    html <|
        svg
            [ viewBox <| "0 0 300 30"
            , SvgA.width <| String.fromInt largeur
            ]
        <|
            [ defs [] [ ombreInterne ] ]
                ++ echologo couleurArrierePlan (SvgA.filter "url(#ombreInterne)")
                ++ [ text_
                        [ x "30"
                        , y "25"
                        , fontFamily "Verdana"
                        , SvgA.fill <| Color.Convert.colorToHex couleurArrierePlan
                        , fontSize "20"
                        , SvgA.filter "url(#ombreInterne)"
                        ]
                        [ Svg.text titre ]
                   ]


ombreInterne =
    filter [ id "ombreInterne" ]
        [ feFlood [ floodColor "black", floodOpacity ".6" ] []
        , feComposite [ in2 "SourceAlpha", operator "out" ] []
        , feGaussianBlur [ stdDeviation "1" ] []
        , feOffset [ dx ".1", dy ".5" ] []
        , feComposite [ in2 "SourceAlpha", operator "in" ] []
        , feMerge []
            [ feMergeNode [ in_ "SourceGraphic" ] []
            , feMergeNode [] []
            ]
        ]


designGeneral largeur titre elmt =
    layout
        [ height fill
        , width fill
        , padding tresGrandEspacement
        , Background.color <| couleurUI <| couleurArrierePlan
        ]
    <|
        column
            [ height fill
            , width fill
            , Background.color <| couleurUI <| vert 0
            , Border.rounded 13
            ]
            [ row []
                [ entete
                    (largeur - 2 * (petitEspacement + grandEspacement))
                    titre
                ]
            , elmt
            ]
