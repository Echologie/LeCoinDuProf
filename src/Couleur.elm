module Couleur exposing (Couleur)


type alias Couleur =
    { rouge : Float
    , vert : Float
    , bleu : Float
    }


plusSombre : Float -> Couleur -> Couleur
plusSombre taux { red, green, blue, alpha } =
    if red < green && red < blue then
        let
            nouveauRouge =
                red * taux

            nouveauPasRouge =
                nouveauRouge - red
        in
        { red = nouveauRouge
        , green = green + nouveauPasRouge
        , blue = blue + nouveauPasRouge
        , alpha = alpha
        }

    else if green < blue then
        let
            nouveauVert =
                green * taux

            nouveauPasVert =
                nouveauVert - green
        in
        { red = red + nouveauPasVert
        , green = nouveauVert
        , blue = blue + nouveauPasVert
        , alpha = alpha
        }

    else
        let
            nouveauBleu =
                blue * taux

            nouveauPasBleu =
                nouveauBleu - blue
        in
        { red = red + nouveauPasBleu
        , green = green + nouveauPasBleu
        , blue = blue + nouveauBleu
        , alpha = alpha
        }
