/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { UserInputError } = require('apollo-server-express')
const { User } = require('@models')

const login = async (_, { login, password }) => {
  const user = await User.findOne({ where: { login } })
  if (!user) throw new UserInputError('Usuário não encontrado!')

  console.log(user)
  if (!(await user.verifyPassword(password))) {
    throw new UserInputError('Senha inválida!')
  }

  user.passwordHash = undefined

  return {
    token: User.generateToken({ id: user.id }),
  }
}

module.exports = { login }
