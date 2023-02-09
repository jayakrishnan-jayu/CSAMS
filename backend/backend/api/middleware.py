# from django.http import HttpRequest
# from .validator import Auth0JWTBearerTokenValidator


from django.http import JsonResponse
from django.conf import settings
from jose import jwt


AUTH0_DOMAIN = "csams-dev.eu.auth0.com"
API_AUDIENCE = "https://csams-backend-dev.com"
ALGORITHMS = "RS256"

"""
Cache the key available at https://{AUTH0_DOMAIN}/.well-known/jwks.json as a python dict
"""
AUTH0_PUBLIC_KEY = {"keys":[{"alg":"RS256","kty":"RSA","use":"sig","n":"rV49_95DyQrReYTf1_zx-2pKzPHxrDiQSV7dTLTC2H4GXFs3TV2VjNitROfc6o2a9oVw-eVxQJfkpRaEl2H_LYt8ZIK8PWH2jUya_WOoPC_dKHKCtaLCFUfT5nJOTRjgxhrZsR7ly3vpSM0QRc12bf5Hf4DDFGzlcyLHJ2hKIkpOc8E-P19ljconhrpZQDPFFPjJkLgL74uuWkbF_uY7yM1NP0VwJYGnYjjEv19PtFMzB9Sg_SOknqwLdKtbns2aMdI_irtPpx8HG9EtvPQwgwWkDupitoUbfaRIckVOpYOfKkcqAv7RF72TODhlI_1bA8quDaO5mWMBfTrpxoaR8w","e":"AQAB","kid":"GxDosFktptPgQ0xxvuc7m","x5t":"jf00dv_kKOMlSbHBKIOF06i8VNQ","x5c":["MIIDBzCCAe+gAwIBAgIJDrt6HJXWxUbbMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmNzYW1zLWRldi5ldS5hdXRoMC5jb20wHhcNMjMwMjA5MDcxOTMxWhcNMzYxMDE4MDcxOTMxWjAhMR8wHQYDVQQDExZjc2Ftcy1kZXYuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArV49/95DyQrReYTf1/zx+2pKzPHxrDiQSV7dTLTC2H4GXFs3TV2VjNitROfc6o2a9oVw+eVxQJfkpRaEl2H/LYt8ZIK8PWH2jUya/WOoPC/dKHKCtaLCFUfT5nJOTRjgxhrZsR7ly3vpSM0QRc12bf5Hf4DDFGzlcyLHJ2hKIkpOc8E+P19ljconhrpZQDPFFPjJkLgL74uuWkbF/uY7yM1NP0VwJYGnYjjEv19PtFMzB9Sg/SOknqwLdKtbns2aMdI/irtPpx8HG9EtvPQwgwWkDupitoUbfaRIckVOpYOfKkcqAv7RF72TODhlI/1bA8quDaO5mWMBfTrpxoaR8wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQnSgrtNxjxDHSP+G5/rHSKD5XQNDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAIZdV1yaKIkfPA+GOxpwjlMuZWPdX0YmEMPjUjEAECeq4EovMZLxHUHpAQ3VFP2u6aS6Y3kqhszmL3fP4fKUwNFSOnNpNxq/YvWLF8bSCA1GxM1FtqosxskO98J1FU2skrhMJhI5TL2MnjM9WhaAoh9nhrXmBhGPuq1oXmBKxj5iCv9No/ZjLB3tR26e11N/DyK8CMTQrGaeCAAyPxMgLQkWdN3lVNORK1zeXbiYGKTwe+PaFnE5AbZfSrU09oNiK5MwZBW9+4lpfVmSthmluiZokg6eMFW3dKFAyUlto6oVH8SF7mk8dL+l0ZZMmEB2XRIaXw4fS91ZS/zoMH7CwO4="]},{"alg":"RS256","kty":"RSA","use":"sig","n":"o75cenM_qQZnyI1jycNk1G4yIJP5TA2saMH-SNVf6n22jFLx9i2i-2eicJMR7A-Itd69Z3IOrwuU6whJUWgr_4i6_HJikMsgnA80QOkIKGs4twBI4KZ48aHnC1iKM_apdYuFOANBjtnycMYxcdlRE6sdy6xFLkTP6oYzyMugPScQHsQmE4omIq8AEZgtvYILgfuu2aS2zyxwlS7zGol7V5LdKGPUirg3R12-WSr4q7ZyNR-NobsQbA18eX1DyuJpN8kK-97VwOgLWPFIEVHoj7T3J9-NgJH6GwY1NsHPKr8Gn_dRJl8Z3oYmoLPcvLVd5EZ4gHWDTJh3D_aGYT__Tw","e":"AQAB","kid":"XHn18Lcrl5A9k79-caSRL","x5t":"XqObrfp30fN-_NJkhWe_tHJljLg","x5c":["MIIDBzCCAe+gAwIBAgIJEywCcUb81NM9MA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmNzYW1zLWRldi5ldS5hdXRoMC5jb20wHhcNMjMwMjA5MDcxOTMxWhcNMzYxMDE4MDcxOTMxWjAhMR8wHQYDVQQDExZjc2Ftcy1kZXYuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo75cenM/qQZnyI1jycNk1G4yIJP5TA2saMH+SNVf6n22jFLx9i2i+2eicJMR7A+Itd69Z3IOrwuU6whJUWgr/4i6/HJikMsgnA80QOkIKGs4twBI4KZ48aHnC1iKM/apdYuFOANBjtnycMYxcdlRE6sdy6xFLkTP6oYzyMugPScQHsQmE4omIq8AEZgtvYILgfuu2aS2zyxwlS7zGol7V5LdKGPUirg3R12+WSr4q7ZyNR+NobsQbA18eX1DyuJpN8kK+97VwOgLWPFIEVHoj7T3J9+NgJH6GwY1NsHPKr8Gn/dRJl8Z3oYmoLPcvLVd5EZ4gHWDTJh3D/aGYT//TwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQPDOcxb5wmsdYWRTFamKEbYl27CTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAIHrjnq5pA3gBWZAjj3Qdj0iE3NlY3+pPQQlfORgNwSTQBpYJLxC5wZOfF4z3TYpkCQOQqmhLOuC1jQ6PlNsZ62hHJMwsxHks2wMKuZXXl20gQ4m1YW/WvGIFwHii/l45DZ0WSXTNx4F0z/4ujFEuMs/Wh6o0MoOo1WPgULoqIHKp+5smtxqCM3bXHKs0eyyzlLaNmQ3eqGj3H4r9HiR8xLISBjtiggYbCgI6QON1mWSMNTK2WEOU33kz885GLEt/XVlSNqlhffYqz+kmZbOKtZMNauXjwvKhsvYqJCjVlyIETuXD+LY6EKDXIWvBFk0wWzsJl9P+OwTeQE8Ydqp3dk="]}]}


class Auth0Middleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        # GET TOKEN
        auth = request.META.get('HTTP_AUTHORIZATION')
        if not auth:
            if settings.DEBUG:
                response = self.get_response(request)
                return response
            return JsonResponse(
                data={
                    "code": "authorization_header_missing",
                    "description":"Authorization header is expected"
                }, 
                status=401
            )
        parts = auth.split()

        if parts[0].lower() != "bearer":
            return JsonResponse(
                data={
                    "code": "invalid_header",
                    "description": "Authorization header must start with Bearer"
                }, 
                status=401
            )
        elif len(parts) == 1:
            return JsonResponse(
                data={
                    "code": "invalid_header",
                    "description": "Token not found"
                }, 
                status=401
            )
        elif len(parts) > 2:
            return JsonResponse(
                data={
                    "code": "invalid_header",
                    "description": "Authorization header must be Bearer token"
                }, 
                status=401
            )

        token = parts[1]

        # VALIDATE TOKEN

        jwks = AUTH0_PUBLIC_KEY
        try:
            unverified_header = jwt.get_unverified_header(token)
        except jwt.JWTError:

            return JsonResponse(
                data={
                    "code": "invalid_header",
                    "description": "Invalid header. Use an RS256 signed JWT Access Token"
                }, 
                status=401
            )

        if unverified_header["alg"] == "HS256":
            return JsonResponse(
                data={
                    "code": "invalid_header",
                    "description": "Invalid header. Use an RS256 signed JWT Access Token"
                }, 
                status=401
            )

        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                accessToken = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://" + AUTH0_DOMAIN + "/"
                )
                request.sub = accessToken['sub']
                request.authorization = auth
            except jwt.ExpiredSignatureError:
                return JsonResponse(
                    data={
                        "code": "token_expired",
                        "description": "token is expired"
                    }, 
                    status=401
                )
            except jwt.JWTClaimsError:
                return JsonResponse(
                    data={
                        "code": "invalid_claims",
                        "description": "incorrect claims, please check the audience and issuer"
                    }, 
                    status=401
                )
            except Exception:
                return JsonResponse(
                    data={
                        "code": "invalid_header",
                        "description": "Unable to parse authentication token."
                    }, 
                status=400
            )
        else:
            return JsonResponse(
                data={
                    "code": "invalid_header",
                    "description": "Unable to find appropriate key"
                }, 
                status=401
            )
        
        response = self.get_response(request)
        return response