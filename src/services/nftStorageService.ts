// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { File, NFTStorage } from "nft.storage";

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {File} image the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function storeNFT(image: File, name: string, description: string) {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORAGE_KEY as string,
  });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image,
    name,
    description,
  });
}

export default { storeNFT };
