/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

require('dotenv').config()
const { ApolloError } = require('apollo-server-express')

const { User } = require('@models')
const jwt = require('jsonwebtoken')

const getToken = (authorization) => {
  if (!authorization) return authorization

  const parts = authorization.split(' ')
  if (parts.length !== 2) throw new Error('Token Error.')

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) throw new Error('Token Mal formatted.')

  return token
}

const getAuthenticatedUser = async (authorization) => {
  try {
    const token = getToken(authorization)

    if (!token) return null

    const { id } = await jwt.verify(token, process.env.AUTH_SECRET)

    const user = await User.findOne({ where: { id } })

    return user
  } catch (e) {
    throw new ApolloError(e.message, 'JWT')
  }
}

module.exports = { getAuthenticatedUser }
