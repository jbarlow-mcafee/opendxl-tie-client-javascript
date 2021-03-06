'use strict'

var common = require('../common')
var dxl = common.require('@opendxl/dxl-client')
var MessageUtils = common.require('@opendxl/dxl-bootstrap').MessageUtils
var TieClient = common.require('@opendxl/dxl-tie-client').TieClient

// Create DXL configuration from file
var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)

// Create the client
var client = new dxl.Client(config)

// Connect to the fabric, supplying a callback function which is invoked
// when the connection has been established
client.connect(function () {
  // Create the McAfee Threat Intelligence Exchange (TIE) client
  var tieClient = new TieClient(client)

  // Register detection callback with the client
  tieClient.addFileDetectionCallback(function (detectionObj, originalEvent) {
    // Display the DXL topic that the event was received on
    console.log('Detection on topic: ' + originalEvent.destinationTopic)
    // Dump the detection info
    console.log(MessageUtils.objectToJson(detectionObj, true))
  })

  // Wait forever
  console.log('Waiting for detection events...')
})
