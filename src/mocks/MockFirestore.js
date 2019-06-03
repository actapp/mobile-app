import { mockDelay } from './Util'

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
        await mockDelay()
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

    set = async data => {
        await mockDelay()
        this.setSync(data)
    }

    // Doc snapshot
    get = async () => {
        await mockDelay()
        return this.getSync()
    }

    update = async data => {
        await mockDelay()
        console.log('Updating')
        console.log(data)
        this.dataObj = { ...this.dataObj, ...data }
        console.log(this.dataObj)
    }

    getSync = () => {
        console.log('get')
        console.log(this.dataObj)
        return {
            exists: this.dataObj != null,
            data: () => this.dataObj,
            dataObj: this.dataObj
        }
    }

    setSync = data => {
        this.dataObj = data
    }
}

export default MockFirestore