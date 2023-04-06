require('dotenv').config()
const { exec } = require('child_process')

const openapiPath = 'packages/api/openapi'
const localOpenApiPath = `${openapiPath}/swagger.json`

const getCommand = (apiSpecificationPath) => {
  return `openapi-generator-cli generate -i ${apiSpecificationPath} -g typescript-axios -o ${openapiPath} --additional-properties=withoutPrefixEnums=true`
}

const branchToPull = 'main'

const mainCommand = getCommand(localOpenApiPath)

const getMainOpenApiSpecificationCommand = `curl -H "Authorization: token ${process.env.GITHUB_ACCESS_TOKEN}" "https://raw.githubusercontent.com/Wholesome-Living-Project/wholesome-living-backend/${branchToPull}/docs/swagger.json" -o ${localOpenApiPath} --create-dirs `

let errorCount = 0

const runCommand = (command) => {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error('🚨 Please fetch latest secrets 🚨')
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      return
    }

    if (stderr) {
      console.log(stderr)
      return
    }

    console.log(stdout)
  })
}

runCommand(getMainOpenApiSpecificationCommand)
runCommand(mainCommand)
