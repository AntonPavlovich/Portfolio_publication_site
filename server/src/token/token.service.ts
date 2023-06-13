import { Injectable } from '@nestjs/common';
import { CacheService } from '../services/cache.service';
import { TokenInterface, TokenPayload } from './config/config';
import { JwtService } from '@nestjs/jwt';
import { config } from './config/config';

@Injectable()
export class TokenService {
  constructor(
    private cacheService: CacheService,
    private jwtService: JwtService
  ) {}

  async verifyAccessToken(token) {
    return this.verifyCachedToken(token, config.accessToken)
  }

  async verifyRefreshToken(token) {
    const acc = await this.cacheService.get('accessT')
    console.log(acc)
    return this.verifyCachedToken(token, config.refreshToken)
  }

  async signTokenPair(payload: TokenPayload): Promise<Record<string, string>>{
    const {
      accessToken: accessTokenConfig,
      refreshToken: refreshTokenConfig
    } = config;

    const accessToken = await this.signTokenWithCache(payload, accessTokenConfig );
    const refreshToken = await this.signTokenWithCache(payload, refreshTokenConfig );

    return {
      accessToken,
      refreshToken
    }
  }

  private async verifyCachedToken( token, config ): Promise<TokenPayload> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: config.secret
    })
    const cachedToken = await this.cacheService.get(config.cacheKey);

    if (cachedToken !== token) {
      throw new Error('JWT error: tokens don`t not match');
    }

    return {
      id: payload.id,
      email: payload.email
    }
  }

  private async signTokenWithCache(
    payload: TokenPayload,
    config: TokenInterface
  ): Promise<string> {

    const token = await this.jwtService.signAsync(payload, {
      secret: config.secret,
      expiresIn: config.expiresIn
    })

    await this.cacheService.set(config.cacheKey, token, config.expiresIn);

    return token;
  }

  async deleteTokenPair(){
    const { accessToken, refreshToken } = config;
    await this.cacheService.delete(accessToken.cacheKey);
    await this.cacheService.delete(refreshToken.cacheKey)
  }

}
