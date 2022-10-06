module Backend exposing (app)

import Lamdera


app =
    Lamdera.backend
        { init = ( init, Cmd.none )
        , update = update
        , updateFromFrontend = updateFromFrontend
        , subscriptions = subscriptions
        }


init =
    {}


update msg model =
    ( {}
    , Cmd.none
    )


updateFromFrontend sessionId clientId msg model =
    ( {}
    , Cmd.none
    )


subscriptions a =
    Sub.none
