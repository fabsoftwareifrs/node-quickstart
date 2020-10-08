/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'
require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      login: DataTypes.STRING,
      password: DataTypes.VIRTUAL(DataTypes.STRING),
      passwordHash: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  User.beforeSave(async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8)
    }
  })

  User.prototype.verifyPassword = function (pwd) {
    return bcrypt.compare(pwd, this.passwordHash)
  }

  User.generateToken = function ({ id, role }) {
    const SECONDS_IN_A_DAY = 24 * 60 * 60
    return jwt.sign({ id, role }, process.env.AUTH_SECRET, {
      expiresIn: SECONDS_IN_A_DAY,
    })
  }

  return User
}
