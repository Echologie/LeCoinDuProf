module Echologo exposing (echologo)

import Element exposing (..)
import Svg exposing (..)
import Svg.Attributes as SvgA exposing (cx, cy, d, r, strokeWidth, viewBox)


echologo taille =
    html <|
        svg [ viewBox "0 0 30 30", SvgA.height <| String.fromInt taille ]
            [ circle [ cx "15", cy "15", r "15", SvgA.fill "#64c29b", strokeWidth "0" ] []
            , g [ SvgA.fill "#fff", strokeWidth "0" ]
                [ circle [ cx "13.8", cy "9", r "2" ] []
                , path [ d "M 12.3,6.4019238 A 3,3 0 0 0 11.201924,10.5 5,5 0 0 1 12.3,2.1592831 a 3,3 0 0 0 0,4.2426407" ] []
                , path [ d "m13.8 6a3 3 0 0 1 3 3 6 6 0 0 1 8.485281 0 8 8 0 0 0-11.485281-3" ] []
                , path [ d "M 12.3,11.598076 A 3,3 0 0 0 16.398076,10.5 13,13 0 0 1 12.3,28.568639 a 12,12 0 0 0 0,-16.970563" ] []
                ]
            ]
