import GA from "react-ga"

const isProduction = process.env.NODE_ENV === "production"
const isClient = typeof window !== "undefined"

export const analyticsInit = () =>
  isProduction && GA.initialize("UA-76349880-1")

export const analyticsPageView = () => {
  if (isClient) {
    if (isProduction) {
      const url = window.location.pathname + window.location.search
      GA.set({page: url})
      GA.pageview(url)
    } else {
      console.info("New pageview", window.location.href)
    }
  }
}
