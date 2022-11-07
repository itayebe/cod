// import orderRequest from './order-request.json';
const orderRequest = {
    "order_id": "dd95dcce-bd31-48a0-9b6a-5554e6e82efd",
    "items": [
      {
        "name": "dd95dcce-bd31-48a0-9b6a-5554e6e82efd/manifest.json",
        "delivery": "success",
        "location": "https://api.planet.com/compute/ops/download/?token=aaa",
        "expires_at": "2019-09-24T05:06:54.601Z"
      },
      {
        "name": "dd95dcce-bd31-48a0-9b6a-5554e6e82efd/PSScene4Band/20200922_183724_23_106a/20200922_183724_23_106a_metadata.json",
        "delivery": "success",
        "location": "https://api.planet.com/compute/ops/download/?token=bbb",
        "expires_at": "2019-09-24T05:06:54.607Z"
      }
    ]
  }
const orderWithMissingNameProperty = JSON.parse(JSON.stringify(orderRequest));
delete orderWithMissingNameProperty.items[0].name;
const orderWithBadOrderId = JSON.parse(JSON.stringify(orderRequest));
orderWithBadOrderId.order_id = 123;
const orderWithBadLocation = JSON.parse(JSON.stringify(orderRequest));
orderWithBadLocation.items[0].location = 'https://api.et.com/compute/ops/download/?token=aaa';

console.log(orderRequest);
console.log(orderWithMissingNameProperty);
console.log(orderWithBadOrderId);
console.log(orderWithBadLocation);