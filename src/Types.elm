module Types exposing (..)

import Prof


type alias FrontendModel =
    Prof.Model


type alias BackendModel =
    {}


type alias FrontendMsg =
    Prof.Msg


type ToBackend
    = NoOpToBackend


type BackendMsg
    = NoOpBackendMsg


type ToFrontend
    = NoOpToFrontend
