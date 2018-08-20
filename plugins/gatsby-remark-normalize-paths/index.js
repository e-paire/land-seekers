const visit = require(`unist-util-visit`)
const {isAbsolute} = require("path")
const {getRelativePath} = require(`./utils.js`)

module.exports = ({getNode, markdownAST, markdownNode}, options) => {
  visit(markdownAST, `image`, (node, index, parent) => {
    const isAbsoluteUrl = isAbsolute(node.url)
    const {absolutePath} = getNode(markdownNode.parent)

    if (node.url && isAbsoluteUrl) {
      node.url = getRelativePath(absolutePath, node.url)
    }
  })
}
