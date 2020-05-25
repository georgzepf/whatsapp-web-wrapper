interface BlocklistResponseObject {
  id: number;
  blocklist: string[];
}

type BlocklistResponse = [string, BlocklistResponseObject];
export default BlocklistResponse;
