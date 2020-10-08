/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const Sequelize = require('sequelize')
const config = require('../../config/database')

const sequelize = new Sequelize(config)

const models = {}

const modules = [require('./User')]

modules.forEach((module) => {
  const model = module(sequelize, Sequelize.DataTypes)
  models[model.name] = model
})

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) models[modelName].associate(models)
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
