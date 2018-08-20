const {isAbsolute} = require("path")
const eachProps = require("each-props")
var isValidPath = require("is-valid-path")
const {getRelativePath} = require(`./utils.js`)

function normalizePath(path, keyChain, nodeInfo) {
  const {name, node} = nodeInfo
  const isString = typeof path === "string"

  if (!path || !isString || !isValidPath(path)) {
    if (isString && path.length === 0) {
      nodeInfo.parent[name] = undefined
    }
    return true
  }

  const isCoverAbsolute = isAbsolute(path)

  if (path && isString && isCoverAbsolute) {
    nodeInfo.parent[name] = getRelativePath(node.fileAbsolutePath, path)
  }
}

exports.onCreateNode = ({node}) => {
  const isMarkdownRemark = node.internal.type === "MarkdownRemark"

  if (!isMarkdownRemark) {
    return
  }

  eachProps(node.frontmatter, normalizePath, {node})
}
