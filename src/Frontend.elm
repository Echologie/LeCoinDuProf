module Frontend exposing (app)

import Lamdera
import Prof


app =
    Lamdera.frontend
        { init =
            Prof.init
                { l = 400
                , h = 300
                }
        , onUrlRequest = Prof.LinkClicked
        , onUrlChange = Prof.UrlChanged
        , update = Prof.update
        , updateFromBackend = updateFromBackend
        , subscriptions = Prof.subscriptions
        , view = Prof.view
        }


updateFromBackend msg model =
    ( model
    , Cmd.none
    )
