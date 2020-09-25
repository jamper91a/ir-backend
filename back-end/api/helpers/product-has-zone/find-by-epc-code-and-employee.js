module.exports = {


  friendlyName: 'Get by epc',


  description: 'Find a product zone by the epc. It is used in the' +
    'mobile app',


  inputs: {
    epc: {
      type: 'string',
      required: true
    },
    company:{
      type: 'number',
      required: true,
      description: 'To validate the epc to find belogs to the company of the user'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'By epc',
    },

  },


  fn: async function ({epc, company}) {

    //Find the epc
    var epcToFind = await  Epcs.findOne({epc: epc, company: company});

    if(epcToFind) {
      var productZone = await ProductsHasZones.findOne({epc: epcToFind.id})
        .populate('product')
        .populate('sell')

      var zone = await Zones.findOne({id: productZone.zone}).populate('shop')
      if(productZone) {
        productZone.epc = epcToFind
        productZone.zone = zone
      }
      return productZone
    } else {
      throw 'epcNotFound'
    }

  }


};

