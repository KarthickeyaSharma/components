import Realm from 'realm';

class Customizations extends Realm.Object {}
Customizations.schema = {
  name: 'Customizations',
  primaryKey: 'skuName',
  properties: {
    skuName: 'string',
    frontPage: 'string',
    leftPage: 'string',
    rightPage: 'string',
    hasPreview: {type: 'bool', default: false},
    createdTimestamp: {type: 'date'},
  },
};
// open a local realm with the 'Customizations' schema
const realm = new Realm({schema: [Customizations]});

// retrieve the set of Customizations objects
const customizations = realm.objects('Customizations');

// Retrieves all items in sorted(reversed) order
export const getCustomizationItems = () => {
  const customizationItems = customizations.sorted('createdTimestamp', true);
  return customizationItems;
};
// Retrieve a single item
export const getCustomizationItem = skuName => {
  const customizationItem = customizations.filtered(`skuName == '${skuName}'`);
  return customizationItem;
};

// Update item. any parameter must be of Realm.Object
export const updateFrontItem = (skuName, frontPage) => {
  const skuCustomization = realm
    .objects('Customizations')
    .filtered(`skuName = '${skuName}'`)[0];
  realm.write(() => {
    try {
      skuCustomization.frontPage = frontPage;
    } catch (e) {
      console.warn(e);
    }
  });
};

// Update item. any parameter must be of Realm.Object
export const updateLeftItem = (skuName, leftPage) => {
  const skuCustomization = realm
    .objects('Customizations')
    .filtered(`skuName = '${skuName}'`)[0];
  realm.write(() => {
    try {
      skuCustomization.leftPage = leftPage;
    } catch (e) {
      console.warn(e);
    }
  });
};

// Update item. any parameter must be of Realm.Object
export const updateRightItem = (skuName, rightPage) => {
  const skuCustomization = realm
    .objects('Customizations')
    .filtered(`skuName = '${skuName}'`)[0];
  realm.write(() => {
    try {
      skuCustomization.rightPage = rightPage;
    } catch (e) {
      console.warn(e);
    }
  });
};

// Update item. any parameter must be of Realm.Object
export const updatePreview = (skuName, hasPreview) => {
  const skuCustomization = realm
    .objects('Customizations')
    .filtered(`skuName = '${skuName}'`)[0];
  realm.write(() => {
    try {
      skuCustomization.hasPreview = hasPreview;
    } catch (e) {
      console.warn(e);
    }
  });
};

// Creates a new Item
export const createCustomizationItem = (
  skuName,
  frontPage,
  leftPage,
  rightPage,
) => {
  let skuCustomization;
  realm.write(() => {
    skuCustomization = realm.create('Customizations', {
      // _id: new BSON.ObjectID(),
      skuName: skuName,
      frontPage: frontPage,
      leftPage: leftPage,
      rightPage: rightPage,
      createdTimestamp: new Date(),
    });
  });
};
// Deletes a Item. skuName parameter must be Realm.Object
export const deleteCustomizationItem = skuName => {
  realm.write(() => {
    const deleteSku = realm
      .objects('Customizations')
      .filtered(`skuName == '${skuName}'`);
    realm.delete(deleteSku);
  });
};
