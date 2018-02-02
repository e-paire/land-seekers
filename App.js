import React from "react"
import {createApp, renderApp} from "@phenomic/preset-react-app/lib/client"
import {Router, Route, browserHistory} from "react-router"
import {addLocaleData, IntlProvider} from "react-intl"
import frLocaleData from "react-intl/locale-data/fr"

import HomeLayout from "./src/layouts/Home"
import PostLayout from "./src/layouts/Post"
import ErrorLayout from "./src/layouts/Error"
import TagLayout from "./src/layouts/Tag"
import AuthorsLayout from "./src/layouts/Authors"
import AuthorLayout from "./src/layouts/Author"
import {analyticsInit, analyticsPageView} from "./src/utils/analytics"

addLocaleData(frLocaleData)
analyticsInit()

const App = () => (
  <IntlProvider locale="fr" defaultLocale="fr">
    <Router history={browserHistory} onUpdate={analyticsPageView}>
      <Route path="/" component={HomeLayout} />
      <Route path="/blog/*" component={PostLayout} />
      <Route path="/authors" component={AuthorsLayout} />
      <Route path="/author/*" component={AuthorLayout} />
      <Route path="/after/:after" component={HomeLayout} />
      <Route path="/tag/:tag" component={TagLayout} />
      <Route path="*" component={ErrorLayout} />
    </Router>
  </IntlProvider>
)

export default createApp(App)

if (module && module.hot) {
  module.hot.accept(() => renderApp(App))
}
