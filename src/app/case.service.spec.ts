import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { CaseService } from './case.service';

describe('CaseService', () => {
  let service: CaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
    ],});
    
    service = TestBed.inject(CaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
