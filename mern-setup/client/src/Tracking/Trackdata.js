// mockData.js
const trackingData = [
    {
      trackingNumber: '123456789',
      progress: [
        { status: 'Pickup Confirmed', date: 'Sep 9th Sat, 2023', completed: true },
        { status: 'Pickup Done', date: 'Sep 11th Mon, 2023', completed: true },
        { status: 'Parcel on the way', date: 'Sep 14th Wed, 2023', completed: false },
        { status: 'Delivered', date: 'Expected Sep 10th Mon, 2023', completed: false }
      ]
    },
    {
        trackingNumber: '987654321',
        progress: [
          { status: 'Pickup Confirmed', date: 'Nov 9th Sat, 2023', completed: true },
          { status: 'Pickup Done', date: 'Expected Nov 11th Mon, 2023', completed: false },
          { status: 'Parcel on the way', date: 'No data', completed: false },
          { status: 'Delivered', date: 'Nov 16th Wed, 2023', completed: false }
        ]
      },
  ];
  
  export default trackingData;
  