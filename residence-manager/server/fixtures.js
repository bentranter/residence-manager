// Add residence data
if (Residences.find().count() === 0) {
  Residences.insert({
    building: 'Sibley',
    type: 'Residence Hall',
    beds: 'Single',
    tenantNames: [],
    tenants: 0 // use $inc
  });

  Residences.insert({
    building: 'Shuniah',
    type: 'Residence Hall',
    beds: 'Double',
    tenantNames: [],
    tenants: 0 // use $inc
  });

  Residences.insert({
    building: 'Bartley',
    type: 'Townhouse',
    beds: 'Double',
    tenantNames: [],
    tenants: 0 // use $inc
  });

  Residences.insert({
    building: 'Chicago',
    type: 'Apartment',
    beds: 'Double',
    tenantNames: [],
    tenants: 0 // use $inc
  });

  Residences.insert({
    building: 'Ripley',
    type: 'Townhouse',
    beds: 'Single',
    tenantNames: [],
    tenants: 0 // use $inc
  });

  Residences.insert({
    building: 'Ridgemont',
    type: 'Residence Hall',
    beds: 'Single Basic',
    tenantNames: [],
    tenants: 0 // use $inc
  });
}
