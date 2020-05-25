interface InitResponse {
  status: number;
  ref: string;
  ttl: number;
  update: boolean;
  curr: string;
  time: number;
}

export default InitResponse;
