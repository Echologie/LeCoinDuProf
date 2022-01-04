module Style exposing (..)

import Color
import Color.Manipulate
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Input as Input


{-| HSL = 155, 43.5, 57.6
-}
echoVert =
    Color.fromRgba
        { red = 100 / 255
        , green = 194 / 255
        , blue = 155 / 255
        , alpha = 255 / 255
        }


vert t =
    fromRgb <|
        Color.toRgba <|
            Color.Manipulate.lighten t echoVert


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
        , Background.color <| vert -0.2
        , Border.rounded 8
        , Border.shadow
            { blur = 10
            , color = rgb255 10 10 10
            , offset = ( 0.3, 0.4 )
            , size = 2
            }
        ]
        { onPress = Just fonction
        , label = text label
        }
