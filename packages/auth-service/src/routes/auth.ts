import { eq } from 'drizzle-orm';
import { Router } from 'express';
import passport, { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../database/db';
import { SelectUser, users } from '../database/schemas';

const router = Router();

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/oauth2/redirect/google',
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.providerId, profile.id))
            .limit(1);

          if (existingUser.length > 0) {
            return done(null, existingUser[0]);
          }

          const newUser = await db
            .insert(users)
            .values({
              username: profile.displayName,
              fristName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              email: profile.emails?.[0]?.value,
              provider: 'google',
              providerId: profile.id,
            })
            .returning()
            .execute();

          return done(null, newUser[0]);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  passport.serializeUser((user: SelectUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(id)))
        .limit(1);
      done(null, user[0] || null);
    } catch (error) {
      done(error);
    }
  });
};

router.get(
  '/login/federated/google',
  passport.authenticate('google', { prompt: 'select_account' })
);

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/board',
    failureRedirect: 'http://localhost:3000/',
  })
);

router.post('/logout', function(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000/');
  });
});

export default router;
