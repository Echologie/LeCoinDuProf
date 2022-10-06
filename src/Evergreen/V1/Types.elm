module Evergreen.V1.Types exposing (..)

import Evergreen.V1.Prof


type alias FrontendModel =
    Evergreen.V1.Prof.Model


type alias BackendModel =
    {}


type alias FrontendMsg =
    Evergreen.V1.Prof.Msg


type ToBackend
    = NoOpToBackend


type BackendMsg
    = NoOpBackendMsg


type ToFrontend
    = NoOpToFrontend
