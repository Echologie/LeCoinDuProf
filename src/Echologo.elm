module Echologo exposing (..)

import Color
import Color.Convert
import Svg exposing (..)
import Svg.Attributes
    exposing
        ( cx
        , cy
        , d
        , fill
        , fontFamily
        , fontSize
        , height
        , r
        , strokeWidth
        , viewBox
        , x
        , y
        )


{-| HSL = 155, 43.5, 57.6
Hex = #64c29b
-}
vertMante =
    Color.fromRgba
        { red = 100 / 255
        , green = 194 / 255
        , blue = 155 / 255
        , alpha = 255 / 255
        }


echologo couleurArrierePlan ombre =
    [ circle
        [ cx "15"
        , cy "15"
        , r "15"
        , fill <| Color.Convert.colorToHex vertMante
        , strokeWidth "0"
        ]
        []
    , g
        [ fill <| Color.Convert.colorToHex couleurArrierePlan
        , strokeWidth "0"
        , ombre
        ]
        [ circle [ cx "13.8", cy "9", r "2" ] []
        , path [ d "M 12.3,6.4019238 A 3,3 0 0 0 11.201924,10.5 5,5 0 0 1 12.3,2.1592831 a 3,3 0 0 0 0,4.2426407" ] []
        , path [ d "m13.8 6a3 3 0 0 1 3 3 6 6 0 0 1 8.485281 0 8 8 0 0 0-11.485281-3" ] []
        , path [ d "M 12.3,11.598076 A 3,3 0 0 0 16.398076,10.5 13,13 0 0 1 12.3,28.568639 a 12,12 0 0 0 0,-16.970563" ] []
        ]
    ]
