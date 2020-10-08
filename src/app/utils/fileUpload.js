/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const fs = require('fs')

module.exports = ({ stream, filename, mimetype, types = [] }) => {
  if (!types.includes(mimetype)) {
    throw new Error('Formato de imagem não permitido!')
  }

  const pathFile = `uploads/${filename}`

  return new Promise((resolve, reject) => {
    stream
      .on('open', () => {
        stream
          .pipe(fs.createWriteStream(pathFile))
          .on('error', (error) => reject(error))
          .on('finish', () => resolve({ pathFile }))
      })
      .on('error', (error) => {
        if (stream.truncated) {
          fs.unlinkSync(pathFile)
          reject(new Error('Tamanho do arquivo excedeu o limite!'))
        }
        reject(error)
      })
  })
}
