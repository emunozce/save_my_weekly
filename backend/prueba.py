from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


if __name__ == "__main__":
    hashed = "$2b$12$SrnpTMkuOIzZJ1DSddpV2eJlEkS6l14ZuBrlGDCCZbDrMxTvRH2TC"
    print(hashed)
    print(verify_password("secret", hashed))
