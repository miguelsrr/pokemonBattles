import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { Pokemon } from './pokemon.interface';

@Injectable()
export class PokemonService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  getPokemon(id: string): Promise<Pokemon> {
    return this.http
      .get<{ [data: string]: Pokemon }>(
        `${this.configService.get('PUBLIC_API_URL')}pokemon/${id}`,
      )
      .pipe(map((res: AxiosResponse) => res.data))
      .toPromise();
  }
}