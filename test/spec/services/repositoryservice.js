'use strict';

describe('Service: repositoryService', function () {

  // load the service's module
  beforeEach(module('finLiteApp'));

  // instantiate service
  var repositoryService;
  beforeEach(inject(function (_repositoryService_) {
    repositoryService = _repositoryService_;
  }));

  it('should do something', function () {
    expect(!!repositoryService).toBe(true);
  });

});
