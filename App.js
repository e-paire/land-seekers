import React from "react"
import {createApp, renderApp} from "@phenomic/preset-react-app/lib/client"
import {Router, Route, browserHistory} from "react-router"

import HomeLayout from "./src/layouts/Home"
import ContactLayout from "./src/layouts/Contact"
import PostLayout from "./src/layouts/Post"
import ErrorLayout from "./src/layouts/Error"
import TagLayout from "./src/layouts/Tag"
import AuthorsLayout from "./src/layouts/Authors"
import AuthorLayout from "./src/layouts/Author"
import {analyticsInit, analyticsPageView} from "./src/utils/analytics"

analyticsInit()

const App = () => (
  <Router history={browserHistory} onUpdate={analyticsPageView}>
    <Route path="/" component={HomeLayout} />
    <Route path="/blog/*" component={PostLayout} />
    <Route path="/authors" component={AuthorsLayout} />
    <Route path="/author/*" component={AuthorLayout} />
    <Route path="/contact" component={ContactLayout} />
    <Route path="/after/:after" component={HomeLayout} />
    <Route path="/tag/:tag" component={TagLayout} />
    <Route path="/404.html" component={ErrorLayout} />
    <Route path="*" component={ErrorLayout} />
  </Router>
)

export default createApp(App)

if (module && module.hot) {
  module.hot.accept(() => renderApp(App))
}
