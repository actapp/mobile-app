const collectionRefs = {

}

function dump() {
    const collections = Object.keys(collectionRefs).map(key => collectionRefs[key])
    console.log(collections)
}

function populateCollectionsFromConfig(initialCollections) {
    const keyedCollections = Object.keys(initialCollections).map(key => ({ key, ...initialCollections[key] }))

    console.log(keyedCollections)
    for (let i = 0; i < keyedCollections.length; i++) {
        const newCollection = new MockCollectionRef(keyedCollections[i].key)
        populateMockCollectionRefFromConfig(initialCollections[keyedCollections[i].key], newCollection)
        collectionRefs[keyedCollections[i].key] = newCollection
    }
}

function populateMockCollectionRefFromConfig(configCollection, mockCollectionRef) {
    const keyedDocs = Object.keys(configCollection).map(key => ({ key, ...configCollection[key] }))
    for (let i = 0; i < keyedDocs.length; i++) {
        const newDocRef = mockCollectionRef.doc(keyedDocs[i].key)
        newDocRef.setSync(configCollection[keyedDocs[i].key])
    }
}

class MockFirestore {
    constructor(config) {
        this.config = config
        if (this.config.collections) {
            console.log('Has collections to populate:')
            console.log(this.config)

            populateCollectionsFromConfig(this.config.collections)

            console.log('Populated collections from config')
            dump()
        }
    }

    collection = name => {
        console.log('Getting collection ' + name)

        if (!collectionRefs[name]) {
            collectionRefs[name] = new MockCollectionRef(name)
        }

        dump()

        return collectionRefs[name]
    }
}

class MockCollectionRef {
    constructor(name) {
        this.name = name
        this.docRefs = {}
    }

    doc = name => {
        if (this.docRefs[name] == null) {
            this.docRefs[name] = new MockDocRef(name)
        }

        return this.docRefs[name]
    }

    // QuerySnapshot
    get = async () => {
        const docs = Object.keys(this.docRefs).map(key => this.docRefs[key].getSync())
        return {
            docs
        }
    }
}

class MockDocRef {
    constructor(name) {
        this.name = name
        this.dataObj = null
    }

    set = async data => this.setSync(data)

    // Doc snapshot
    get = async () => this.getSync()

    update = async data => this.dataObj = { ...this.dataObj, ...data }

    getSync = () => ({
        exists: this.dataObj != null,
        data: () => this.dataObj,
        dataObj: this.dataObj
    })

    setSync = data => {
        this.dataObj = data
    }
}

export default MockFirestore